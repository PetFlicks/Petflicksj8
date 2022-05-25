package com.petflicks.app.Repository;

import io.github.cdimascio.dotenv.Dotenv;

public class VideoFileRepository {
	Dotenv dotenv = Dotenv.configure().directory("./src/main/resources").filename("secrets.env").load();
	
//	System.out.println(dotenv.get("MY_ENV_ACCESS"));

	
}
