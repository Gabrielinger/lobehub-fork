'use client';

import { ActionIcon, Flexbox } from '@lobehub/ui';
import { CheckCheckIcon } from 'lucide-react';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { DESKTOP_HEADER_ICON_SIZE } from '@/const/layoutTokens';
import SkeletonList from '@/features/NavPanel/components/SkeletonList';
import SideBarDrawer from '@/features/NavPanel/SideBarDrawer';
import dynamic from '@/libs/next/dynamic';
import { mutate } from '@/libs/swr';
import { notificationService } from '@/services/notification';

import { FETCH_KEY, UNREAD_COUNT_KEY } from './constants';

const Content = dynamic(() => import('./Content'), {
  loading: () => (
    <Flexbox gap={1} paddingBlock={1} paddingInline={4}>
      <SkeletonList rows={3} />
    </Flexbox>
  ),
  ssr: false,
});

interface InboxDrawerProps {
  onClose: () => void;
  open: boolean;
}

const InboxDrawer = memo<InboxDrawerProps>(({ open, onClose }) => {
  const { t } = useTranslation('notification');

  const refreshList = useCallback(() => {
    mutate((key: unknown) => Array.isArray(key) && key[0] === FETCH_KEY);
    mutate(UNREAD_COUNT_KEY);
  }, []);

  const handleMarkAsRead = useCallback(
    async (id: string) => {
      await notificationService.markAsRead([id]);
      refreshList();
    },
    [refreshList],
  );

  const handleArchive = useCallback(
    async (id: string) => {
      await notificationService.archive(id);
      refreshList();
    },
    [refreshList],
  );

  const handleMarkAllAsRead = useCallback(async () => {
    await notificationService.markAllAsRead();
    refreshList();
  }, [refreshList]);

  return (
    <SideBarDrawer
      open={open}
      title={t('inbox.title')}
      action={
        <ActionIcon
          icon={CheckCheckIcon}
          size={DESKTOP_HEADER_ICON_SIZE}
          title={t('inbox.markAllRead')}
          onClick={handleMarkAllAsRead}
        />
      }
      onClose={onClose}
    >
      <Content open={open} onArchive={handleArchive} onMarkAsRead={handleMarkAsRead} />
    </SideBarDrawer>
  );
});

InboxDrawer.displayName = 'InboxDrawer';

export default InboxDrawer;
