---
layout: archive
title: "Journal"    
permalink: /journal/         
author_profile: true
---

{% include base_path %}

Here I document my monthly thoughts and my daily life.

{% for post in site.journal reversed %}
  {% include archive-single.html %}
{% endfor %}