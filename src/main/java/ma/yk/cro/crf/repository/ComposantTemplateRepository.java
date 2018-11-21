package ma.yk.cro.crf.repository;

import ma.yk.cro.crf.domain.ComposantTemplate;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ComposantTemplate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComposantTemplateRepository extends JpaRepository<ComposantTemplate, Long> {

}
