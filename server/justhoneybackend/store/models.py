from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify


class User(AbstractUser):
    phone = models.CharField(max_length=20, blank=True, null=True)
    is_vendor = models.BooleanField(default=False)

    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to.',
        related_name="store_user_groups",
        related_query_name="store_user",
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name="store_user_permissions",
        related_query_name="store_user",
    )

    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.email

class ProductCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    slug = models.SlugField(unique=True, blank=True)
    image_url = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)
    
    class Meta:
        db_table = 'product_categories'
        verbose_name_plural = 'Product Categories'
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    short_description = models.CharField(max_length=160, blank=True)
    base_sku = models.CharField(max_length=25, unique=True)  # Renamed from sku
    base_price = models.DecimalField(max_digits=5, decimal_places=2)  # Renamed from price
    base_selling_price = models.DecimalField(max_digits=5, decimal_places=2)  # Renamed from selling_price
    base_weight = models.IntegerField(default=0)  # Renamed from weight_grams
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    categories = models.ManyToManyField(ProductCategory, through='ProductCategoryMapping')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    has_variants = models.BooleanField(default=False)
    slug = models.SlugField(unique=True, blank=True)
    stock_quantity = models.IntegerField(default=0)
    # Removed default_variant foreign key - we'll handle this differently

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            counter = 1
            while Product.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    class Meta:
        db_table = 'products'
        ordering = ['-created_at']

class ProductVariant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    name = models.CharField(max_length=100)  # e.g., "250g", "500g"
    sku = models.CharField(max_length=50, unique=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    selling_price = models.DecimalField(max_digits=5, decimal_places=2)
    weight_grams = models.IntegerField()
    stock_quantity = models.IntegerField(default=0)
    is_default = models.BooleanField(default=False)  # Mark one variant as default

    class Meta:
        ordering = ['weight_grams']  # Sort variants by weight ascending

    def save(self, *args, **kwargs):
        # Ensure only one default variant per product
        if self.is_default:
            ProductVariant.objects.filter(
                product=self.product
            ).exclude(pk=self.pk).update(is_default=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.product.name} - {self.name}"
class ProductCategoryMapping(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE)
    
    class Meta:
        db_table = 'product_category_mappings'
        unique_together = ('product', 'category')

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image_url = models.URLField()
    alt_text = models.CharField(max_length=255, blank=True)
    sort_order = models.IntegerField(default=0)
    
    class Meta:
        db_table = 'product_images'
        ordering = ['sort_order']
    
    def __str__(self):
        return f"Image #{self.sort_order} for {self.product.name}"

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'orders'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Order #{self.id} - {self.get_status_display()}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    variant = models.ForeignKey(ProductVariant, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = 'order_items'

    @property
    def total_price(self):
        return self.quantity * self.unit_price

    def __str__(self):
        variant_info = f" ({self.variant.name})" if self.variant else ""
        return f"{self.quantity}x {self.product.name if self.product else 'Deleted Product'}{variant_info}"
# class Review(models.Model):
#     RATING_CHOICES = [
#         (1, '1 Star'),
#         (2, '2 Stars'),
#         (3, '3 Stars'),
#         (4, '4 Stars'),
#         (5, '5 Stars'),
#     ]
    
#     product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
#     user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
#     rating = models.IntegerField(choices=RATING_CHOICES)
#     comment = models.TextField(blank=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     is_approved = models.BooleanField(default=False)
    
#     class Meta:
#         db_table = 'reviews'
#         ordering = ['-created_at']
    
#     def __str__(self):
#         return f"{self.get_rating_display()} for {self.product.name}"