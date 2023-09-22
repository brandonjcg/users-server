import { getModels } from '../../utils';

describe('Unit test getModels fn', () => {
    it('Should return an array of strings, without index.ts', () => {
        const modelFiles = [
            'index.ts', 
            'file1.ts',
            'file2.ts',
            'file3.ts'
        ];
        const result = getModels(modelFiles);

        const expected = [
            'file1.ts',
            'file2.ts',
            'file3.ts'
        ];

        expect(result).toEqual(expected);
    });

    it('Should return an empty array, if missing input', () => {
        const result = getModels();

        const expected = [];

        expect(result).toEqual(expected);
    });
})