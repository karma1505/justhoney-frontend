from rest_framework import serializers
from .models import (
    User, Product, ProductCategory, 
    ProductImage, Order, OrderItem, ProductVariant
)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'phone', 'is_vendor']
        extra_kwargs = {
            'password': {'write_only': True},
            'is_vendor': {'read_only': True},
        }

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'last_name', 'phone']
    
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            phone=validated_data.get('phone', '')
        )
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data.update({
            'user': UserSerializer(self.user).data
        })
        return data

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['image_url', 'alt_text', 'sort_order']

class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ['id', 'name', 'slug', 'description', 'image_url']

class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ['id', 'name', 'price', 'selling_price', 'weight_grams',
                 'stock_quantity', 'sku', 'is_default']


class ProductSerializer(serializers.ModelSerializer):
    variants = ProductVariantSerializer(many=True, read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    default_variant = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'description', 'short_description',
                  'base_sku', 'base_price', 'base_selling_price', 'base_weight',
                  'is_active', 'is_featured', 'has_variants', 'categories',
                  'variants', 'images', 'default_variant', 'stock_quantity']

    def get_default_variant(self, obj):
        if obj.has_variants and obj.variants.exists():
            default_variant = obj.variants.filter(is_default=True).first()
            if default_variant:
                return default_variant.id
            # Return first variant if no default set
            return obj.variants.first().id
        return None

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    total_price = serializers.SerializerMethodField()
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'unit_price', 'total_price']
    
    def get_total_price(self, obj):
        return obj.total_price

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id', 'user', 'status', 'status_display', 
            'total_amount', 'created_at', 'items'
        ]

# class ReviewSerializer(serializers.ModelSerializer):
#     user = UserSerializer(read_only=True)
#     rating_display = serializers.CharField(source='get_rating_display', read_only=True)
    
#     class Meta:
#         model = Review
#         fields = [
#             'id', 'user', 'product', 'rating', 'rating_display',
#             'comment', 'created_at', 'is_approved'
#         ]
#         extra_kwargs = {
#             'product': {'write_only': True},
#             'is_approved': {'read_only': True},
#         }