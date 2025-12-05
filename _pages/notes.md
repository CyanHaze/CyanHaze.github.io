---
layout: archive
title: "Learning Notes"
permalink: /notes/
author_profile: true
---

{% include base_path %}

Here is a collection of my study notes on Mathematics, Deep Learning, and Robotics.

{% for post in site.notes reversed %}
  {% include archive-single.html %}
{% endfor %}