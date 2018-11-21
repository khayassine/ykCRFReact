package ma.yk.cro.crf.service.mapper;

import ma.yk.cro.crf.domain.*;
import ma.yk.cro.crf.service.dto.FichePatientDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity FichePatient and its DTO FichePatientDTO.
 */
@Mapper(componentModel = "spring", uses = {CentreMapper.class})
public interface FichePatientMapper extends EntityMapper<FichePatientDTO, FichePatient> {

    @Mapping(source = "centre.id", target = "centreId")
    FichePatientDTO toDto(FichePatient fichePatient);

    @Mapping(source = "centreId", target = "centre")
    @Mapping(target = "formulairePatients", ignore = true)
    FichePatient toEntity(FichePatientDTO fichePatientDTO);

    default FichePatient fromId(Long id) {
        if (id == null) {
            return null;
        }
        FichePatient fichePatient = new FichePatient();
        fichePatient.setId(id);
        return fichePatient;
    }
}
