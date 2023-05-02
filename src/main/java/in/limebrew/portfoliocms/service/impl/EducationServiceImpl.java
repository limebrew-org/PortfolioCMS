package in.limebrew.portfoliocms.service.impl;

import com.google.cloud.firestore.Firestore;
import in.limebrew.portfoliocms.entity.Education;
import in.limebrew.portfoliocms.service.EducationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;
@Service
public class EducationServiceImpl implements EducationService {


    @Autowired
    private final Firestore firestore;

    public EducationServiceImpl(Firestore firestore) {
        this.firestore = firestore;
    }

    @Override
    public List<Education> getAllEducation(String profileId) throws ExecutionException, InterruptedException {
        return null;
    }

    @Override
    public Education getEducationById(String id) throws ExecutionException, InterruptedException {
        return null;
    }

    @Override
    public String createEducation(Education education) throws ExecutionException, InterruptedException {
        return null;
    }

    @Override
    public String updateEducationById(String id, Education education) throws ExecutionException, InterruptedException {
        return null;
    }

    @Override
    public String deleteTransactionById(String id) throws ExecutionException, InterruptedException {
        return null;
    }
}
