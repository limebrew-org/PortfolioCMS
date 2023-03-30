package in.limebrew.portfoliocms.entity.Experience;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Job {

    public String profileId;

    public String company;

    public String role;

    public List<String> technologies;

    public String summary;

    public String tenure;
}
