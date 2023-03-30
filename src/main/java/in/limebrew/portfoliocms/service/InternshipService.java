package in.limebrew.portfoliocms.service;

import in.limebrew.portfoliocms.entity.Experience.Internship;

import java.util.List;
import java.util.concurrent.ExecutionException;

public interface InternshipService {

    List<Internship> getAllInternships(String profileId) throws InterruptedException, ExecutionException;

    Internship getInternshipById(String profileId, String id) throws InterruptedException, ExecutionException;

    String createInternship(Internship internship) throws InterruptedException, ExecutionException;

    String updateInternshipById(String id, Internship internship) throws InterruptedException, ExecutionException;

    String deleteInternshipById(String id) throws InterruptedException, ExecutionException;
}
