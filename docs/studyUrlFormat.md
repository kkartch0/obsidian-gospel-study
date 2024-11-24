# Study URL Format

This document describes the format that is generated on the vast majority of library content. This occurs when selecting the text and then selecting "Copy Link" (iOS).

Example URLs: 
- https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/5?lang=eng&id=p1-p2#p1
- https://www.churchofjesuschrist.org/study/general-conference/2024/10/15renlund?lang=eng&id=p_sDWjE-p_copYg#p_sDWjE
- https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/10?id=title2,scripture_title1,title3,p2-p4&lang=eng#title2 

## Id Param

https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/5?lang=eng&`id=p1-p2`#p1

The id param is what stores id items (comma separated) of the paragraphs to highlight. Each id item can include an individual paragraph id (a single) (e.g. p_sDWjE) or a range of paragraph ids (a range) (e.g. p1-p4).

### Single

Format: `Paragraph Id`\
Examples:
- p1
- title2
- scripture_title1

### Range

Format: `Paragraph Id` `Hyphen` `Paragraph Id`\
Examples:
- p1-p5
- p_sDWjE-p_copYg

### Mixture of Singles and Ranges

Examples:

Id Param Value | Format Followed
--|--
p1-p3,p5,p8 | `Range`,`Single`,`Single`
p_sDWjE-p_copYg | `Range`
title2,scripture_title1,title3,p2-p4 | `Single`,`Single`,`Single`,`Range`

## Internal Page Reference (#)

https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/5?lang=eng&id=p1-p2`#p1`

Format: `#<paragraph id>`

This is a way to navigate to a particular paragraph upon loading of the page. Without it, the page loads and the top and not with the highlighted paragraphs in focus. This is typically set to the id of the first paragraph provided in the id param of the URL.  

## Variations
### Just Number (e.g. 1) Format

Format: `id=<number>#<paragraph id>`\
Examples: 
- https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/22?lang=eng&`id=2`#p2
- https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/10?lang=eng&`id=24`#p24
- https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/10?lang=eng&`id=2-4`

When the id parameter contains only numbers, the church website appears to prepend these numbers with a "p". This forms the paragraph ids to highlight.

#### Natural Occurrence

As of 2024-11-23, one occurence of this format is when sharing the verse of the day from the Gospel Library app on iOS. However, this seems unintentional, because if you select that same verse once navigated to and then share the link, the link follows the standard format.