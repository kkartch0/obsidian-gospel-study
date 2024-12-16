# Text Fragment Parsing

Support for handling different text fragment URLs will gradually be added. The intended use case is to select text on a website, right click, then select "Copy link to highlight". 

From there, the copied link is pasted into Obsidian. The Gospel Study plugin then uses that URL to retrieve the highlighted text and format it as a study block.

## Case 1: Simple text fragment with textStart

### Example 1

URL: https://speeches.byu.edu/talks/dale-g-renlund/observation-reason-faith-and-revelation/#:~:text=Thank%20you%2C%20brothers%20and%20sisters%2C%20for%20being%20here.

Expected Text:

> Thank you, brothers and sisters, for being here.

### Example 2

URL: https://speeches.byu.edu/talks/dale-g-renlund/observation-reason-faith-and-revelation/#:~:text=at%20one%20time%20or%20another%2C%20many%20of%20us%20have%20asked%20ourselves%2C%20%E2%80%9Chow%20do%20i%20know%20whether%20the%20thought%20i%20have%20is%20my%20own%20or%20if%20it%20is%20from%20the%20holy%20ghost%3F%E2%80%9D%20this%20is%20a%20reasonable%20question.%20perhaps%20a%20better%20question%2C%20and%20certainly%20a%20more%20actionable%20one%2C%20is%20this%3A%20%E2%80%9Cshould%20i%20act%20on%20this%20particular%20thought%3F%E2%80%9D

Expected Text:

> At one time or another, many of us have asked ourselves, “How do I know whether the thought I have is my own or if it is from the Holy Ghost?” This is a reasonable question. Perhaps a better question, and certainly a more actionable one, is this: “Should I act on this particular thought?”


## Case 2: textStart and textEnd

TODO: Add support for this.

## Case 3: Examples with prefix- and/or -suffix

TODO: Add support for this.

## Case 4: URLs with multiple text fragments

TODO: Add support for this.