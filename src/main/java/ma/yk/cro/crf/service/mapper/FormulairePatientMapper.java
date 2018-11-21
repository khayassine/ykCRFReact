package ma.yk.cro.crf.service.mapper;

import ma.yk.cro.crf.domain.*;
import ma.yk.cro.crf.service.dto.FormulairePatientDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity FormulairePatient and its DTO FormulairePatientDTO.
 */
@Mapper(componentModel = "spring", uses = {FichePatientMapper.class, FormulaireTemplateMapper.class})
public interface FormulairePatientMapper extends EntityMapper<FormulairePatientDTO, FormulairePatient> {

    @Mapping(source = "fichePatient.id", target = "fichePatientId")
    @Mapping(source = "formulaireTemplate.id", target = "formulaireTemplateId")
    FormulairePatientDTO toDto(FormulairePatient formulairePatient);

    @Mapping(source = "fichePatientId", target = "fichePatient")
    @Mapping(source = "formulaireTemplateId", target = "formulaireTemplate")
    @Mapping(target = "composantValeurs", ignore = true)
    FormulairePatient toEntity(FormulairePatientDTO formulairePatientDTO);

    default FormulairePatient fromId(Long id) {
        if (id == null) {
            return null;
        }
        FormulairePatient formulairePatient = new FormulairePatient();
        formulairePatient.setId(id);
        return formulairePatient;
    }
}
