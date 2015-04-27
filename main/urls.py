# coding=utf8
# -*- coding: utf8 -*-
# vim: set fileencoding=utf8 :

from django.conf.urls import patterns, include, url
from django.views.generic import RedirectView
from main import views

urlpatterns = patterns('',

	#Pagina inicial
        url(r'^$','main.views.index',name='index'),
        url(r'^en/$','main.views.index', {'lang': 'en'}, name='index_en'),

	#Bandejao
        url(r'^bandejao/$','main.views.bandejao',name='bandejao'),
        url(r'^en/bandejao/$','main.views.bandejao', {'lang': 'en'}, name='bandejao_en'),

	#Kinnav
        url(r'^kinnav/$','main.views.kinnav',name='kinnav'),
        url(r'^en/kinnav/$','main.views.kinnav', {'lang': 'en'}, name='kinnav_en'),

	#Das
        url(r'^das/$','main.views.das',name='das'),
        url(r'^en/das/$','main.views.das', {'lang': 'en'}, name='das_en'),

)
