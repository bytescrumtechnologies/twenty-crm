import { RecordActionMenuEntriesSetter } from '@/action-menu/actions/record-actions/components/RecordActionMenuEntriesSetter';
import { RecordAgnosticActionMenuEntriesSetter } from '@/action-menu/actions/record-agnostic-actions/components/RecordAgnosticActionMenuEntriesSetter';
import { RunWorkflowRecordAgnosticActionMenuEntriesSetter } from '@/action-menu/actions/record-agnostic-actions/components/RunWorkflowRecordAgnosticActionMenuEntriesSetter';
import { RecordAgnosticActionsKey } from '@/action-menu/actions/record-agnostic-actions/types/RecordAgnosticActionsKey';
import { ActionMenuConfirmationModals } from '@/action-menu/components/ActionMenuConfirmationModals';
import { ActionMenuContext } from '@/action-menu/contexts/ActionMenuContext';
import { ActionMenuComponentInstanceContext } from '@/action-menu/states/contexts/ActionMenuComponentInstanceContext';
import { COMMAND_MENU_ANIMATION_VARIANTS } from '@/command-menu/constants/CommandMenuAnimationVariants';
import { useCommandMenu } from '@/command-menu/hooks/useCommandMenu';
import { useCommandMenuHotKeys } from '@/command-menu/hooks/useCommandMenuHotKeys';
import { isCommandMenuOpenedState } from '@/command-menu/states/isCommandMenuOpenedState';
import { CommandMenuAnimationVariant } from '@/command-menu/types/CommandMenuAnimationVariant';
import { ContextStoreComponentInstanceContext } from '@/context-store/states/contexts/ContextStoreComponentInstanceContext';
import { RecordFiltersComponentInstanceContext } from '@/object-record/record-filter/states/context/RecordFiltersComponentInstanceContext';
import { AppHotkeyScope } from '@/ui/utilities/hotkey/types/AppHotkeyScope';
import { useListenClickOutside } from '@/ui/utilities/pointer-event/hooks/useListenClickOutside';
import { workflowReactFlowRefState } from '@/workflow/workflow-diagram/states/workflowReactFlowRefState';
import { useIsFeatureEnabled } from '@/workspace/hooks/useIsFeatureEnabled';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { useIsMobile } from 'twenty-ui';
import { FeatureFlagKey } from '~/generated-metadata/graphql';

const StyledCommandMenu = styled(motion.div)`
  background: ${({ theme }) => theme.background.secondary};
  border-left: 1px solid ${({ theme }) => theme.border.color.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.strong};
  font-family: ${({ theme }) => theme.font.family};
  height: 100%;
  overflow: hidden;
  padding: 0;
  position: fixed;
  right: 0%;
  top: 0%;
  z-index: 30;
  display: flex;
  flex-direction: column;
`;

export const CommandMenuContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { toggleCommandMenu, closeCommandMenu } = useCommandMenu();

  const isCommandMenuOpened = useRecoilValue(isCommandMenuOpenedState);

  const commandMenuRef = useRef<HTMLDivElement>(null);

  const workflowReactFlowRef = useRecoilValue(workflowReactFlowRefState);

  useCommandMenuHotKeys();

  useListenClickOutside({
    refs: [
      commandMenuRef,
      ...(workflowReactFlowRef ? [workflowReactFlowRef] : []),
    ],
    callback: closeCommandMenu,
    listenerId: 'COMMAND_MENU_LISTENER_ID',
    hotkeyScope: AppHotkeyScope.CommandMenuOpen,
  });

  const isMobile = useIsMobile();

  const targetVariantForAnimation: CommandMenuAnimationVariant = isMobile
    ? 'fullScreen'
    : 'normal';

  const theme = useTheme();

  const isWorkflowEnabled = useIsFeatureEnabled(
    FeatureFlagKey.IsWorkflowEnabled,
  );

  return (
    <RecordFiltersComponentInstanceContext.Provider
      value={{ instanceId: 'command-menu' }}
    >
      <ContextStoreComponentInstanceContext.Provider
        value={{ instanceId: 'command-menu' }}
      >
        <ActionMenuComponentInstanceContext.Provider
          value={{ instanceId: 'command-menu' }}
        >
          <ActionMenuContext.Provider
            value={{
              isInRightDrawer: false,
              onActionExecutedCallback: ({ key }) => {
                if (key !== RecordAgnosticActionsKey.SEARCH_RECORDS) {
                  toggleCommandMenu();
                }
              },
            }}
          >
            <RecordActionMenuEntriesSetter />
            <RecordAgnosticActionMenuEntriesSetter />
            {isWorkflowEnabled && (
              <RunWorkflowRecordAgnosticActionMenuEntriesSetter />
            )}
            <ActionMenuConfirmationModals />
            {isCommandMenuOpened && (
              <StyledCommandMenu
                data-testid="command-menu"
                ref={commandMenuRef}
                className="command-menu"
                animate={targetVariantForAnimation}
                initial="closed"
                exit="closed"
                variants={COMMAND_MENU_ANIMATION_VARIANTS}
                transition={{ duration: theme.animation.duration.normal }}
              >
                {children}
              </StyledCommandMenu>
            )}
          </ActionMenuContext.Provider>
        </ActionMenuComponentInstanceContext.Provider>
      </ContextStoreComponentInstanceContext.Provider>
    </RecordFiltersComponentInstanceContext.Provider>
  );
};
