package in.limebrew.portfoliocms.service;

import in.limebrew.portfoliocms.entity.Experience.Job;

import java.util.List;
import java.util.concurrent.ExecutionException;

public interface JobService {

    List<Job> getAllJobs(String profileId) throws InterruptedException, ExecutionException;

    Job getJobById(String id) throws InterruptedException, ExecutionException;

    String createJob(Job job) throws InterruptedException, ExecutionException;

    String updateJobById(String id, Job job) throws InterruptedException, ExecutionException;

    String deleteJobById(String id) throws InterruptedException, ExecutionException;
}
