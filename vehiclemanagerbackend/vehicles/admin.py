from django.contrib import admin

from vehicles.models import Vehicle, Vehicle_Register


class VehicleAdmin(admin.ModelAdmin):
  list_display = [f.name for f in Vehicle._meta.fields]


class VehicleRegisterAdmin(admin.ModelAdmin):
  list_display = [f.name for f in Vehicle_Register._meta.fields]


admin.site.register(Vehicle, VehicleAdmin)
admin.site.register(Vehicle_Register, VehicleRegisterAdmin)

