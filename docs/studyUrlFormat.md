# Study URL Format

## Concepts
### Id Param

The id param is what stores id elements (comma separated) of the paragraphs to highlight. Each id element can include an individual paragraph id (a single) (e.g. p_sDWjE) or a range of paragraph ids (a range) (e.g. p1-p4).

### Id Element Types

#### Single

Format: <Paragraph Id>
Examples:
- p1
- title2
- scripture_title1

#### Range

Format: <Paragraph Id><Hyphen><Paragraph Id>
Examples:
- p1-p5
- p_sDWjE-p_copYg

### Mixture of Singles and Ranges

Examples:
- p1-p3,p5,p8                              --->      <Range>,<Single>,<Single>
- p_sDWjE-p_copYg                          --->      <Single>
- title2,scripture_title1,title3,p2-p4     --->      <Single>,<Single>,<Single>,<Range>


Format: "id=<paragraph id>-<paragraph id>#<paragraph id>"
Examples: 
- https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/5?lang=eng&id=p1-p2#p1
- https://www.churchofjesuschrist.org/study/general-conference/2024/10/15renlund?lang=eng&id=p_sDWjE-p_copYg#p_sDWjE
- https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/10?id=title2,scripture_title1,title3,p2-p4&lang=eng#title2 

### Natural Occurrence

This seems to be the format that is generated on the vast majority of library content when selecting the text and then selecting "Copy Link" (iOS).

## Variations
### Just Number (e.g. 1) Format

Format: "id=<number>#<paragraph id>"
Examples: 
- https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/22?lang=eng&id=2#p2
- https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/10?lang=eng&id=24#p24
- https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/10?lang=eng&id=2-4

In the case of there just being numbers, it seems evident that the church website will prepend the numbers with a "p" to get the ids of the paragraphs to highlight.

#### Natural Occurrence

As of 2024-11-23, one occurence of this format is when sharing the verse of the day from the Gospel Library app on iOS. However, this seems unintentional, because if you select that same verse once navigated to and then share the link, the link follows the standard format.