# Generic Exploratory Data Analysis

This project was made to help in exploring the datasets directly withput coding. You can directly upload the csv file and have do the basic exploring.

This code base is of Frontend only made using ReactJS Library and hosted on github pages which I linked to a custom domain [https://eda.data-sciences.in](https://eda.data-sciences.in) click to view it in your browser.

The Backend is developed using Flask (framework in python) and for some reasons that repository is private. And I used [https://www.pythonanywhere.com/](https://www.pythonanywhere.com/) to host the Backend server.

## How to use

So once you visit the [https://eda.data-sciences.in](https://eda.data-sciences.in), you have to upload the csv data file which you want to explore. After that select the Yes/No option indicationg whether data set contains the column names in 1st row or not.

## Available Options

These are the available options once you have uploaded the csv file and selected the Yes/No option indicating column names existence.

### Get Top 5 Rows

Upon clicking on this option, you'll get Top 5 rows of all columns in form of images and displayed to you on browser

### Get Info

Upon Clicking on this option:

    * You'll get details about number of missing values for each column.
    * Also you'll be provided with statistical details of numerical columns
      like count, mean, standard deviation, min, 25 percentile, 50 percentile, 75 percentile, max

### Make Plots

Upon Clicking on this option:

    * You'll get a Histogram distribution of all numerical columns.
    * You'll get a Heatmap showing all the correlations between numerical columns.
    * You'll get Counts of each categorical columns