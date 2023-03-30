package in.limebrew.portfoliocms.entity;

import com.google.cloud.firestore.annotation.DocumentId;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Skill {
    @DocumentId
    public String id;

    public String profileId;

    public List<String> frontend;

    public List<String> backend;

    public List<String> database;

    public List<String> cloud;

    public List<String> fundamentals;
}
