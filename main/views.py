from django.shortcuts import render
from django.http import Http404
from django.shortcuts import *

# Create your views here.

def index(request, lang='pt-br'):
    '''
    Returns Index page
    '''
    context = RequestContext(request)

    if lang != 'pt-br' and land != 'en':
        raise Http404

    else:
        return render_to_response('main/index.html', {'lang' : lang }, context)

def bandejao(request, lang='pt-br'):
    '''
    Returns Bandejao page
    '''
    context = RequestContext(request)

    if lang != 'pt-br' and land != 'en':
        raise Http404

    else:
        return render_to_response('main/bandejao/index.html', {'lang' : lang }, context)

def das(request, lang='pt-br'):
    '''
    Returns Index page
    '''
    context = RequestContext(request)

    if lang != 'pt-br' and land != 'en':
        raise Http404

    else:
        return render_to_response('main/das/index.html', {'lang' : lang }, context)

def kinnav(request, lang='pt-br'):
    '''
    Returns Index page
    '''
    context = RequestContext(request)

    if lang != 'pt-br' and land != 'en':
        raise Http404

    else:
        return render_to_response('main/kinnav/index.html', {'lang' : lang }, context)
