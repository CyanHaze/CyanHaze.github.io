---
layout: archive
title: "Learning"    
permalink: /learning/         
author_profile: true
---

{% include base_path %}

Here I document my learning progress and thoughts.

{% for post in site.learning reversed %}
  {% include archive-single.html %}
{% endfor %}