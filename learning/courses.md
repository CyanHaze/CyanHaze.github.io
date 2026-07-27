---
layout: single
title: "Curriculum & Courses"
permalink: /learning/courses/
author_profile: true
---

Detailed records of courses I took.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
  {% for post in site.courses %}
  <!-- 动态生成卡片，点击整个卡片跳转 -->
  <a href="{{ post.url }}" style="text-decoration: none; color: inherit;">

    <div style="border: 1px solid #e0e0e0; padding: 20px; border-radius: 6px; background: #fff; transition: transform 0.2s; height: 100%; display: flex; flex-direction: column;
      {% if post.tags contains 'CS' %} border-left: 4px solid #0d47a1; {% elsif post.tags contains 'Math' %} border-left: 4px solid #1b5e20; {% elsif post.tags contains 'AI' %} border-left: 4px solid #e65100; {% else %} border-left: 4px solid #999; {% endif %}">

      

      <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
        <!-- 自动根据 Tag 显示颜色标签 -->
        {% if post.tags contains 'CS' %}
          <span style="background-color: #e3f2fd; color: #0d47a1; padding: 2px 8px; border-radius: 4px; font-size: 0.7em; font-weight: bold;">CS</span>
        {% elsif post.tags contains 'MATH' %}
          <span style="background-color: #e8f5e9; color: #1b5e20; padding: 2px 8px; border-radius: 4px; font-size: 0.7em; font-weight: bold;">Math</span>
        {% elsif post.tags contains 'AI' %}
          <span style="background-color: #fff3e0; color: #e65100; padding: 2px 8px; border-radius: 4px; font-size: 0.7em; font-weight: bold;">AI</span>
        {% endif %}
        
        <span style="font-size: 0.8em; color: #999;">{{ post.term }}</span>
      </div>
    
      <h3 style="margin: 0 0 5px 0; font-size: 1.2em;">{{ post.title }}</h3>
      <p style="font-size: 0.9em; color: #666; margin-bottom: 10px;">{{ post.school }} · {{ post.code }}</p>
      
      <!-- 显示摘要 excerpt -->
      <p style="font-size: 0.9em; line-height: 1.5; flex-grow: 1;">
        {{ post.excerpt }}
      </p>
      
      <div style="margin-top: 10px; font-size: 0.85em; color: #333; font-weight: bold;">
        View Detail →
      </div>
    </div>
  </a>
  {% endfor %}

</div>

<br>
<a href="/learning/" class="btn btn--inverse">← Back to Dashboard</a>