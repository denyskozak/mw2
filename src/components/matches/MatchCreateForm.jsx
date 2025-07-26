import { useState } from 'react';
import { Button, Flex, TextField, Text } from '@radix-ui/themes';
import { useWS } from '../../hooks/useWS';

export const MatchCreateForm = () => {
  const { sendToSocket } = useWS();
  const [name, setName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(6);

  const handleCreate = () => {
    const max = Number(maxPlayers) || 6;
    sendToSocket({ type: 'CREATE_MATCH', name: name.trim(), maxPlayers: max });
    setName('');
    setMaxPlayers(6);
  };

  return (
    <Flex gap="2" align="end" className="mb-4" wrap="wrap">
      <Flex direction="column">
        <Text as="label" size="2">Name</Text>
        <TextField.Root>
          <TextField.Input value={name} onChange={(e) => setName(e.target.value)} />
        </TextField.Root>
      </Flex>
      <Flex direction="column">
        <Text as="label" size="2">Max players</Text>
        <TextField.Root>
          <TextField.Input
            type="number"
            min="1"
            max="16"
            value={maxPlayers}
            onChange={(e) => setMaxPlayers(e.target.value)}
          />
        </TextField.Root>
      </Flex>
      <Button onClick={handleCreate}>Create</Button>
    </Flex>
  );
};
