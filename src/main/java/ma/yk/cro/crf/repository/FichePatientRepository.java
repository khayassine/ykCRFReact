package ma.yk.cro.crf.repository;

import ma.yk.cro.crf.domain.FichePatient;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FichePatient entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FichePatientRepository extends JpaRepository<FichePatient, Long> {

}
