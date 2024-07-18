param (
    [Parameter(Mandatory=$true)]
    [string]$planUrl
)

$response = (Invoke-WebRequest $planUrl)

# Define the string
$string = $response.ParsedHtml.getElementsByClassName("title-number")[0].innerText;

# Use a regular expression to capture the date range and title
$pattern = '(\d+).(\d+): [^A-Z]+([a-zA-Z]+)[^A-Z]+'

if ($string -match $pattern) {
    $startDate = $matches[1]
    $endDate = $matches[2]
    $year = "2023" # Assuming the year is known or extracted from elsewhere
    $title = $matches[3]

    # Combine the start date and year
    $fullStartDate = "$startDate $year"
    # Combine the end date and year, assuming the same month as the start date
    $fullEndDate = "$($startDate -replace '\d+', $endDate) $year"

    # Output the results
    "Title: $title"
    "Start Date: $fullStartDate"
    "End Date: $fullEndDate"
} else {
    "The string does not match the expected format."
}


# get all paragraphs from the page
$paragraphs = $response.ParsedHtml.getElementsByTagName("p")

# print out the count of paragraphs
$paragraphs.Count

# get paragraphs that have an id matching format "p1", "p2", etc.
$paragraphs | Where-Object { $_.id -match "^p\d+$" } | ForEach-Object {
    # print out the id and the text of the paragraph
    $_.id + ": " + $_.innerText
}