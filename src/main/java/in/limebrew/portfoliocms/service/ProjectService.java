package in.limebrew.portfoliocms.service;

import in.limebrew.portfoliocms.entity.Project;

import java.util.List;
import java.util.concurrent.ExecutionException;

public interface ProjectService {

    List<Project> getAllProjects(String profileId) throws InterruptedException, ExecutionException;

    Project getProjectById(String id) throws InterruptedException, ExecutionException;

    String createProject(Project project) throws InterruptedException, ExecutionException;

    String updateProjectById(String id, Project project) throws InterruptedException, ExecutionException;

    String deleteProjectById(String id) throws InterruptedException, ExecutionException;
}
