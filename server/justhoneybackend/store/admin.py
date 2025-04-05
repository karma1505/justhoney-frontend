from django.contrib import admin
from .models import (
    User, Product, ProductCategory,
    ProductImage, Order, OrderItem, ProductVariant
)
admin.site.register(ProductVariant)
admin.site.register(User)
admin.site.register(Product)
admin.site.register(ProductCategory)
admin.site.register(ProductImage)
admin.site.register(Order)
admin.site.register(OrderItem)