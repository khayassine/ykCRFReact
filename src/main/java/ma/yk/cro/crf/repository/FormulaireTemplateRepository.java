package ma.yk.cro.crf.repository;

import ma.yk.cro.crf.domain.FormulaireTemplate;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FormulaireTemplate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FormulaireTemplateRepository extends JpaRepository<FormulaireTemplate, Long> {

}
