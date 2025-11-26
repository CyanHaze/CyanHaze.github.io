---
layout: archive
title: "Research Journal"    
permalink: /journal/         
author_profile: true
---

{% include base_path %}

Here I document my monthly research progress and thoughts.

{% for post in site.journal reversed %}
  {% include archive-single.html %}
{% endfor %}