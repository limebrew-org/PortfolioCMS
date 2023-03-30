package in.limebrew.portfoliocms.entity;

import lombok.*;

import java.util.HashMap;
import java.util.Map;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Profile {

    public String username;

    public String name;

    public String email;

    public String bio;

    public Map<String,Object> socials;

    public String password;

}
