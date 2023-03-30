package in.limebrew.portfoliocms.service;

import java.text.ParseException;
import java.util.Map;
import java.util.concurrent.ExecutionException;

public interface DashboardService {

    //? Get overall dashboard
    Map<String, Object> getOverallDashBoard(String profileId) throws InterruptedException, ExecutionException, ParseException;
}
