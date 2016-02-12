from django.db import models

class Animal(models.Model):
    genero_opciones =  (
    ('m', 'macho'),
    ('h', 'hembra')
    )
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    genero = models.CharField(max_length=1, choices=genero_opciones)
    fecha_nacimiento = models.DateTimeField(auto_now=False, auto_now_add=False)
    desc = models.TextField(max_length=1024)
    fecha_ingreso = models.DateTimeField(auto_now=True, auto_now_add=False)
    def __unicode__(self):
        return "[" + str(self.id) + "] " + self.nombre
    class Meta:
        verbose_name_plural = "Animales";


class AnimalFoto(models.Model):
    def __str__ (self):
        return self.imagen.url
    galgo = models.ForeignKey(Animal, blank=True, null=True, related_name='fotos')
    imagen = models.ImageField('File', upload_to='images/')
