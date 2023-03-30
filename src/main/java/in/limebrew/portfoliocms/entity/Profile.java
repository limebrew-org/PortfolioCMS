package in.limebrew.portfoliocms.entity;

import com.google.cloud.firestore.annotation.DocumentId;
import lombok.*;

import java.util.HashMap;
import java.util.Map;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Profile {
    @DocumentId
    public String profileId;

    public String username;

    public String name;

    public String email;

    public String bio;

    public Map<String,Object> socials;

    public String password;

}
