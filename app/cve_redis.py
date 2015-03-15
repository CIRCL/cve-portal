#!/usr/bin/env python2
# -*-coding:UTF-8 -*


def vendors(r):
    return r.sunion('t:/a', 't:/h', 't:/o')


def vendor_products(r, vendor):
    allproduct = []
    products = r.smembers('v:' + vendor)
    for product in products:
        allproduct.append(product)
    return allproduct


def get_vendor(r, product):
    result = []
    allvendors = r.sunion('t:/a', 't:/h', 't:/o')
    for vendor in allvendors:
        if product in vendor_products(r, vendor):
            result.append(vendor)
    return result


def product_versions(r, product):
    allversion = []
    versions = r.smembers('p:' + product)
    for version in versions:
        allversion.append(version)
    return allversion


def search_vendor(r, search):
    result = []
    for vendor in vendors(r):
        if search in vendor:
            result.append(vendor)
    return result


def search_product(r, search):
    result = []
    for vendor in vendors(r):
        for product in vendor_products(r, vendor):
            if search in product:
                result.append(product)
    return result


def search_vendor_product(r, search, vendor):
    result = []
    for product in vendor_products(r, vendor):
        if search in product:
            result.append(product)
    return result
