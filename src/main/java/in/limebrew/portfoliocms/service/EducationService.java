package in.limebrew.portfoliocms.service;

import in.limebrew.portfoliocms.entity.Education;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public interface EducationService {
    List<Education> getAllEducation(String profileId) throws ExecutionException, InterruptedException;

    Education getEducationById(String profileId, String id) throws ExecutionException, InterruptedException;

    String createEducation(Education education) throws ExecutionException, InterruptedException;

    String updateEducationById(String id, Education education) throws ExecutionException, InterruptedException;

    String deleteTransactionById(String id) throws ExecutionException, InterruptedException;
}
