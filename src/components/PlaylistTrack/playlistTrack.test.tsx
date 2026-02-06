

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { data } from "@/data";
import { TrackType } from "@/sharedTypes/sharedTypes";
import ReduxProvider from '@/store/ReduxProvider';
import PlaylistTrack from './PlaylistTrack';
import { formatTime } from '@/utils/helpers';


const mockTracks: TrackType[] = data;
const mockTrack: TrackType = data[0];


describe('PlaylistTrack component', () => {
  test('Рендеринг данных трека', () => {
    render(
      <ReduxProvider>
        <PlaylistTrack track={mockTrack} playlist={mockTracks} />
      </ReduxProvider>
    )
    expect(screen.getAllByText('Chase').length).toBeGreaterThan(0);
    expect(screen.getAllByText(mockTrack.name).length).toBeGreaterThan(0);
    expect(screen.getAllByText(formatTime(mockTrack.duration_in_seconds)).length).toBeGreaterThan(0);
  });
});