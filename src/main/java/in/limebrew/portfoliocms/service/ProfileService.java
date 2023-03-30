package in.limebrew.portfoliocms.service;

import in.limebrew.portfoliocms.entity.Profile;

import java.util.concurrent.ExecutionException;

public interface ProfileService {

    Profile getProfileById(String profileId) throws ExecutionException, InterruptedException;

    String updateProfileById(String ProfileId, Profile profile) throws ExecutionException, InterruptedException;
}
