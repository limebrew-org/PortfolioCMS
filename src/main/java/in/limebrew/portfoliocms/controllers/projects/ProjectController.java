package in.limebrew.portfoliocms.controllers.projects;

import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import in.limebrew.portfoliocms.entity.Project;
import in.limebrew.portfoliocms.service.FirebaseAuthService;
import in.limebrew.portfoliocms.service.ProfileService;
import in.limebrew.portfoliocms.service.ProjectService;
import in.limebrew.portfoliocms.utils.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping(value = "/api/project")
@CrossOrigin
public class ProjectController {

    @Autowired
    FirebaseAuthService firebaseAuthService;

    @Autowired
    ProjectService projectService;

    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAllProjects(@RequestParam(value = "id") String profileId) {
        return  null;
    }

    @GetMapping("/{id}")
    public  ResponseEntity<Map<String, Object>> getProjectById(@RequestHeader("Authorization") String authHeader,
                                                               @PathVariable("id") String id) {
        try {
            //? Extract the token
            String token = authHeader.substring(7);

            //? Verify the JWT
            FirebaseToken decodedToken = firebaseAuthService.verifyToken(token);

            //? Get project by id
            Project project = projectService.getProjectById(id);

            //? Create Response
            Map<String, Object> response = new HashMap<>();
            response.put("project", project);

            //? Return response
            return ResponseUtil.successGetOne(response);

        } catch (FirebaseAuthException | ExecutionException | InterruptedException e) {
            return ResponseUtil.errorUnauthorized();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addProject(@RequestHeader("Authorization") String authHeader,
                                                          @RequestBody Project project) {
        try {
            //? Extract the token
            String token = authHeader.substring(7);

            //? Verify the JWT
            FirebaseToken decodedToken = firebaseAuthService.verifyToken(token);

            //? Set profileId from JWT
            project.setProfileId(decodedToken.getUid());

            //? Save in the database
            projectService.createProject(project);

            //? Return response
            return ResponseUtil.successAddOne();

        } catch (FirebaseAuthException | ExecutionException | InterruptedException e) {
            return  ResponseUtil.errorUnauthorized();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, Object>> updateProjectById(@RequestHeader("Authorization") String authHeader,
                                                                 @PathVariable("id") String id,
                                                                 @RequestBody Project project) {
        try {
            //? Extract the token
            String token = authHeader.substring(7);

            //? Verify the JWT
            FirebaseToken decodedToken = firebaseAuthService.verifyToken(token);

            //? Set profileId from JWT
            project.setProfileId(decodedToken.getUid());

            //? Update the project by id
            projectService.updateProjectById(id, project);

            //? Return response
            return ResponseUtil.successUpdateOne();

        } catch (FirebaseAuthException | InterruptedException | ExecutionException e) {
            return ResponseUtil.errorUnauthorized();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteProjectById(@RequestHeader("Authorization") String authHeader,
                                                             @PathVariable("id") String id) {
        try {
            //? Extract the token
            String token = authHeader.substring(7);

            //? Verify the JWT
            firebaseAuthService.verifyToken(token);

            //? Delete the project by id
            projectService.deleteProjectById(id);

            //? Return response
            return ResponseUtil.successDeleteOne();

        } catch (FirebaseAuthException | ExecutionException | InterruptedException e) {
            return ResponseUtil.errorUnauthorized();
        }
    }

}
