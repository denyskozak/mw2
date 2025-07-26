import { SPELL_COST } from '../../consts';

export const meta = {
  id: 'eviscerate',
  key: 'R',
  icon: '/images/icons/classes/rogue/eviscerate.jpg',
  autoFocus: false,
};

export default function castEviscerate({ globalSkillCooldown, isCasting, mana, sendToSocket, activateGlobalCooldown, startSkillCooldown, sounds }) {
  if (globalSkillCooldown || isCasting) return;
  if (mana < SPELL_COST['eviscerate']) {
    if (sounds?.noMana) {
      sounds.noMana.currentTime = 0;
      sounds.noMana.volume = 0.5;
      sounds.noMana.play();
    }
    return;
  }

  sendToSocket({ type: 'CAST_SPELL', payload: { type: 'eviscerate' } });
  activateGlobalCooldown();
  startSkillCooldown('eviscerate');
}
