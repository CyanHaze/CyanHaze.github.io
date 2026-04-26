---
layout: archive
title: "Misc"    
permalink: /misc/         
author_profile: true
---

{% include base_path %}

Here I document some misc content.

{% for post in site.misc reversed %}
  {% include archive-single.html %}
{% endfor %}