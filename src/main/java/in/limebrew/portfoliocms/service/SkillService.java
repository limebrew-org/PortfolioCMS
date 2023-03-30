package in.limebrew.portfoliocms.service;

import in.limebrew.portfoliocms.entity.Skill;

import java.util.List;
import java.util.concurrent.ExecutionException;

public interface SkillService {

    Skill getAllSkills(String profileId) throws InterruptedException, ExecutionException;

    Skill getSkillById(String profileId, String id) throws InterruptedException, ExecutionException;

    String createSkill(Skill skill) throws InterruptedException, ExecutionException;

    String updateSkillById(String id, Skill skill) throws InterruptedException, ExecutionException;

    String deleteSkillById(String id) throws InterruptedException, ExecutionException;
}
