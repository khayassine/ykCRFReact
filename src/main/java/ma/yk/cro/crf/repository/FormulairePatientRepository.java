package ma.yk.cro.crf.repository;

import ma.yk.cro.crf.domain.FormulairePatient;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FormulairePatient entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FormulairePatientRepository extends JpaRepository<FormulairePatient, Long> {

}
