package com.petflicks.app.Repository;

import io.github.cdimascio.dotenv.Dotenv;

public class VideoFileRepository {
	Dotenv dotenv = Dotenv.configure()
	        .directory("./src/main/resources")
	        .ignoreIfMalformed()
	        .ignoreIfMissing()
	        .load();
	final String ACCESS = dotenv.get("MY_ENV_ACCESS");
	final String SECRET = dotenv.get("MY_ENV_SECRET");


	System.out.println(ACCESS + "    " + SECRET);
}
