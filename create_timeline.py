#!/usr/bin/env python
# encoding: utf-8
"""
untitled.py

Created by Uwe Kamper on 2012-06-11.
Copyright (c) 2012 . All rights reserved.
"""

import sys
import os
import unittest
import math
from datetime import datetime, timedelta

my_events1 = [
	{'from': datetime(2004, 8, 1),
	'until': datetime(2005, 4, 30),
	'desc': 'Scopis GmbH'},
	{'from': datetime(2008, 3, 1),
	'until': datetime(2008, 8, 30),
	'desc': 'Charite'},
	{'from': datetime(2010, 5, 1),
	'until': datetime(2010, 11, 30),
	'desc': 'Siemens Corporate Reasearch'},
	{'from': datetime(2011, 2, 1),
	'until': datetime(2011, 9, 30),
	'desc': 'Scopis GmbH'},
	{'from': datetime(2012, 12, 31),
	'until': datetime(2013, 1, 1),
	'desc': 'Bla'},	
]
my_events2 = [
	{'from': datetime(2000,  8, 1),
	'until': datetime(2003,  7, 1),
	'desc': 'Abitur'},
	{'from': datetime(2003,  8, 1),
	'until': datetime(2004,  7, 1),
	'desc': 'MaTA'},
	{'from': datetime(2005, 10, 1),
	'until': datetime(2008,  9, 1),
	'desc': 'Bachelor of Science in Bioinformatics'},
	{'from': datetime(2008, 10, 1),
	'until': datetime(2012,  5, 1),
	'desc': 'Master of Science in Bioinformatics'},	
	{'from': datetime(2012, 12, 31),
	'until': datetime(2013, 1, 1),
	'desc': 'Bla'},	
]
my_events3 = [
	{'from': datetime(2002,   1,  1),
	'until': datetime(2012,  12, 31),
	'desc': 'ITfM GmbH'},
	{'from': datetime(2012, 12, 31),
	'until': datetime(2013, 1, 1),
	'desc': 'Bla'},
]

year_pixels = 240 # number of pixels per year
pixel_per_day = year_pixels / 360.0

class Timeline:
	def __init__(self):
		pass
		
	def pixels(self, a, b):
		return round( (b-a).days * pixel_per_day )

	def generate(self, events, css_class):
		result = []
		last_event = None
		for e in events:
			if last_event != None:
				spacer_size = self.pixels(last_event['until'], e['from'])
				result.append('<div class="cv_spacer" style="height: %dpx;">&nbsp;</div>' % spacer_size)
			event_size = self.pixels(e['from'], e['until'])
			result.append('<div class="cv_item %s" style="height: %dpx;"><h4>%s</h4></div>' % (css_class, event_size, e['desc']))
			last_event = e
		result.reverse()
		print '\n'.join(result)
	
class TimelineTests(unittest.TestCase):
	def setUp(self):
		pass

	def testBla(self):
		t = Timeline()
		t.generate(my_events1, 'cv_professional')
		print '=' * 72
		t.generate(my_events2, 'cv_education')
		print '=' * 72
		t.generate(my_events3, 'cv_professional')

if __name__ == '__main__':
	unittest.main()