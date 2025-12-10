---
layout: archive
title: "Research"    
permalink: /research/         
author_profile: true
---

{% include base_path %}

Here I document some thought-invoking papers and some of my own research work.

{% for post in site.research reversed %}
  {% include archive-single.html %}
{% endfor %}