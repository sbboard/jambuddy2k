import { describe, it, expect } from 'vitest';
import { existsSync } from 'fs';
import { join } from 'path';
import { MOODS, PET_STAGES } from '../../const/rules';

describe('Pet Asset Files', () => {
    describe('All pets have required mood files', () => {
        PET_STAGES.forEach(stage => {
            describe(`Pet Stage ${stage.toString()}`, () => {
                MOODS.forEach(mood => {
                    it(`should have ${mood}.jpg file`, () => {
                        const filePath = join(
                            process.cwd(),
                            'public',
                            'assets',
                            'pets',
                            String(stage),
                            `${mood}.jpg`
                        );
                        expect(
                            existsSync(filePath),
                            `Missing file: public/assets/pets/${stage.toString()}/${mood}.jpg`
                        ).toBe(true);
                    });
                });
            });
        });
    });

    describe('Pet directories exist', () => {
        PET_STAGES.forEach(stage => {
            it(`should have directory for stage ${stage.toString()}`, () => {
                const dirPath = join(
                    process.cwd(),
                    'public',
                    'assets',
                    'pets',
                    String(stage)
                );
                expect(
                    existsSync(dirPath),
                    `Missing directory: public/assets/pets/${stage.toString()}/`
                ).toBe(true);
            });
        });
    });
});
