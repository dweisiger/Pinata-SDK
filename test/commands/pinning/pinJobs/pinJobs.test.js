import axios from 'axios';
import pinJobs from './../../../../src/commands/pinning/pinJobs/pinJobs';

jest.mock('axios');

test('Result other than 200 status is returned', () => {
    const badStatus = {
        status: 700
    };
    axios.get.mockResolvedValue(badStatus);
    expect.assertions(1);
    expect(pinJobs('test', 'test')).rejects.toEqual({
        error: `unknown server response while attempting to retrieve pin jobs: ${badStatus}`,
    });
});

test('200 status is returned', () => {
    const goodStatus = {
        status: 200
    };
    axios.get.mockResolvedValue(goodStatus);
    expect.assertions(1);
    expect(pinJobs('test', 'test')).resolves.toEqual(goodStatus);
});

test('Rejection handled', () => {
    axios.get.mockRejectedValue('test error');
    expect.assertions(1);
    expect(pinJobs('test', 'test')).rejects.toEqual({
        error: 'test error'
    });
});