package com.travelmadeeasy.webscraper;

import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import org.json.simple.JSONObject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class WebScrapper {
	public static void main(String[] args) throws InterruptedException, IOException {
		System.setProperty("webdriver.chrome.driver",
				"C:\\Users\\u1363267\\My folder\\Fall 2021\\Information Retrieval\\Project\\chromedriver.exe");
		// Initiating your chromedriver
		WebDriver driver = new ChromeDriver();
		// maximize window
		driver.manage().window().maximize();

		String baseUrl = "https://www.tripadvisor.com/Attraction_Review-g60922-d255182-Reviews-Big_Cottonwood_Canyon-Salt_Lake_City_Utah.html";

		driver.get(baseUrl);

		Thread.sleep(3000);
		WebElement tabData = driver.findElement(By.id("tab-data-qa-reviews-0"));
		Actions actions = new Actions(driver);
		actions.moveToElement(tabData);
		actions.perform();
		Thread.sleep(1000);

		for (int j = 0; j < 115; j++) {
			for (int i = 1; i <= 10; i++) {
				String userNameXPath = "//*[@id=\"tab-data-qa-reviews-0\"]/div/div[5]/div[" + i
						+ "]/span/span/div[1]/div[1]/div[2]/span/a";
				String userPlaceXPath = "//*[@id=\"tab-data-qa-reviews-0\"]/div/div[5]/div[" + i
						+ "]/span/span/div[1]/div[1]/div[2]/div/div/span[1]";
				String userContributionsXPath = "//*[@id=\"tab-data-qa-reviews-0\"]/div/div[5]/div[" + i
						+ "]/span/span/div[1]/div[1]/div[2]/div/div/span[2]";
				String placeRatingXPath = "//*[@id=\"tab-data-qa-reviews-0\"]/div/div[5]/div[" + i
						+ "]/span/span/div[3]/svg";
				String reviewTitleXPath = "//*[@id=\"tab-data-qa-reviews-0\"]/div/div[5]/div[" + i
						+ "]/span/span/div[4]/a/span";
				String visitDateXPath = "//*[@id=\"tab-data-qa-reviews-0\"]/div/div[5]/div[" + i + "]/span/span/div[5]";
				String reviewContentXPath = "//*[@id=\"tab-data-qa-reviews-0\"]/div/div[5]/div[" + i
						+ "]/span/span/div[6]/div[1]/div/span";
				String writtenDateXPath = "//*[@id=\"tab-data-qa-reviews-0\"]/div/div[5]/div[" + i
						+ "]/span/span/div[8]/div[1]";

				JSONObject docObject = new JSONObject();
				docObject.put("place_name", "Big Cottonwood Canyon");
				if (driver.findElements(By.xpath(userNameXPath)).size() > 0) {
					docObject.put("reviewer", driver.findElement(By.xpath(userNameXPath)).getText());
				} else {
					docObject.put("reviewer", "");
				}
				if (driver.findElements(By.xpath(userPlaceXPath)).size() > 0) {
					docObject.put("reviewer_place", driver.findElement(By.xpath(userPlaceXPath)).getText());
				} else {
					docObject.put("reviewer_place", "");
				}
				if (driver.findElements(By.xpath(userContributionsXPath)).size() > 0) {
					String temp = driver.findElement(By.xpath(userContributionsXPath)).getText();
					docObject.put("contributions",
							Integer.valueOf(temp.substring(0, temp.indexOf(' ')).replaceAll(",", "")));
				} else {
					docObject.put("contributions", 0);
				}
				if (driver.findElements(By.xpath(reviewTitleXPath)).size() > 0) {
					docObject.put("review_title", driver.findElement(By.xpath(reviewTitleXPath)).getText());
				} else {
					docObject.put("review_title", "");
				}
				if (driver.findElements(By.xpath(visitDateXPath)).size() > 0) {
					docObject.put("visit_time", driver.findElement(By.xpath(visitDateXPath)).getText().substring(0, 8));
				} else {
					docObject.put("visit_time", "");
				}
				if (driver.findElements(By.xpath(reviewContentXPath)).size() > 0) {
					docObject.put("comment", driver.findElement(By.xpath(reviewContentXPath)).getText());
				} else {
					docObject.put("comment", "");
				}

				URL url = new URL("http://localhost:9200/places/place/" + "Big_" + (i + (j * 10)));
				HttpURLConnection connection = (HttpURLConnection) url.openConnection();
				connection.setRequestMethod("PUT");
				connection.setRequestProperty("Content-Type", "application/json; utf-8");
				connection.setDoOutput(true);
				try (OutputStream os = connection.getOutputStream()) {
					byte[] input = docObject.toJSONString().getBytes("utf-8");
					os.write(input, 0, input.length);
				}
			}

			String nextButtonXPath = "//*[@id=\"tab-data-qa-reviews-0\"]/div/div[5]/div[11]/div[1]/div/div[1]/div[2]/div/a";
			WebDriverWait wait = new WebDriverWait(driver, 10);
			WebElement nextButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath(nextButtonXPath)));
			nextButton.click();
			Thread.sleep(1000);
		}

		driver.close();

	}
}
