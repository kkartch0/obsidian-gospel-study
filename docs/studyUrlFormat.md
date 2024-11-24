# Study URL Format

This document describes the format generated for most library content when selecting text and then choosing "Copy Link" (iOS).

Example URLs:
- https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/5?lang=eng&id=p1-p2#p1
- https://www.churchofjesuschrist.org/study/general-conference/2024/10/15renlund?lang=eng&id=p_sDWjE-p_copYg#p_sDWjE
- https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/10?id=title2,scripture_title1,title3,p2-p4&lang=eng#title2

## Id Param

The `id` parameter stores comma-separated IDs of the paragraphs to highlight. Each ID can be a single paragraph ID (e.g., `p_sDWjE`) or a range of paragraph IDs (e.g., `p1-p4`).

### Single

Format: `Paragraph Id`\
Examples:
- `p1`
- `title2`
- `scripture_title1`

### Range

Format: `Paragraph Id` `Hyphen` `Paragraph Id`\
Examples:
- `p1-p5`
- `p_sDWjE-p_copYg`

### Mixture of Singles and Ranges

Examples:

| Id Param Value | Format Followed |
|----------------|------------------|
| `p1-p3,p5,p8`  | `Range`, `Single`, `Single` |
| `p_sDWjE-p_copYg` | `Range` |
| `title2,scripture_title1,title3,p2-p4` | `Single`, `Single`, `Single`, `Range` |

## Internal Page Reference (#)

The internal page reference (`#`) navigates to a specific paragraph upon page load. Without it, the page loads at the top, not focusing on the highlighted paragraphs. It is typically set to the ID of the first paragraph in the `id` parameter.

Format: `#<paragraph id>`

Example:
- https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/5?lang=eng&id=p1-p2#p1

## Variations

### Just Number (e.g., 1) Format

When the `id` parameter contains only numbers, the website prepends these numbers with a "p" to form the paragraph IDs to highlight.

Format: `id=<number>#<paragraph id>`\
Examples:
- https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/22?lang=eng&id=2#p2
- https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/10?lang=eng&id=24#p24
- https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/10?lang=eng&id=2-4

#### Natural Occurrence

As of 2024-11-23, this format occurs when sharing the verse of the day from the Gospel Library app on iOS. However, this seems unintentional, as sharing the same verse after navigating to it follows the standard format.