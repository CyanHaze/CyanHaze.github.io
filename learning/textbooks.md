---
layout: single
title: "Professional Textbooks"
permalink: /learning/textbooks/
author_profile: true
---

A curated list of textbooks. Click title to view detailed notes.

<!-- 表头 -->
<div style="display: flex; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; font-weight: bold; letter-spacing: 1px;">
  <div style="flex: 3;">Title & Author</div>
  <div style="flex: 1; text-align: right;">Tag</div>
</div>

{% for post in site.textbooks %}
<!-- 列表项 -->
<div style="display: flex; align-items: center; border-bottom: 1px solid #eee; padding: 15px 0;">

  <!-- 左侧信息 -->
  <div style="flex: 3;">
    <h4 style="margin: 0; font-size: 1.1em;">
      <a href="{{ post.url }}" style="text-decoration: none; color: #2c3e50;">{{ post.title }}</a>
    </h4>
    <p style="margin: 2px 0 0 0; font-size: 0.9em; color: #666;">{{ post.author }}</p>
    <p style="margin: 5px 0 0 0; font-size: 0.85em; color: #888;">
      <i>{{ post.excerpt }}</i>
    </p>
  </div>

  <!-- 右侧标签 (自动判断颜色) -->
  <div style="flex: 1; text-align: right;">
    {% if post.tags contains 'CS' %}
      <span style="background-color: #e3f2fd; color: #0d47a1; padding: 4px 10px; border-radius: 12px; font-size: 0.75em; font-weight: bold; border: 1px solid #bbdefb;">CS</span>
    {% elsif post.tags contains 'Math' %}
      <span style="background-color: #e8f5e9; color: #1b5e20; padding: 4px 10px; border-radius: 12px; font-size: 0.75em; font-weight: bold; border: 1px solid #c8e6c9;">Math</span>
    {% elsif post.tags contains 'AI' %}
      <span style="background-color: #fff3e0; color: #e65100; padding: 4px 10px; border-radius: 12px; font-size: 0.75em; font-weight: bold; border: 1px solid #ffe0b2;">AI</span>
    {% endif %}
  </div>

</div>
{% endfor %}

<br>
<a href="/learning/" class="btn btn--inverse">← Back to Dashboard</a>