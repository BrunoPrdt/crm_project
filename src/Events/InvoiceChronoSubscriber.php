<?php
namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

/**
 * Class InvoiceChronoSubscriber
 * @package App\Events
 */
class InvoiceChronoSubscriber implements EventSubscriberInterface {

    /**
     * @var Security
     */
    private $security;
    /**
     * @var InvoiceRepository
     */
    private $invoiceRepo;

    /**
     * InvoiceChronoSubscriber constructor.
     * @param Security $security
     * @param InvoiceRepository $invoiceRepository
     */
    public function __construct(Security $security, InvoiceRepository $invoiceRepository)
    {
        $this->security = $security;
        $this->invoiceRepo = $invoiceRepository;
    }

    /**
     * @inheritDoc
     */
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ["setChronoForInvoice", EventPriorities::PRE_VALIDATE]
        ];
    }

    /**
     * @param ViewEvent $event
     */
    public function setChronoForInvoice(ViewEvent $event)
    {
        $result = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($result instanceof Invoice && $method === "POST") {
            $invoice = $result;

            $user = $this->security->getUser();

            if ($user !== $invoice->getCustomer()->getUser()) {
                throw new AccessDeniedHttpException("Echec: Ce client ne vous appartient pas, réessayez ! / Game over: This customer is not one of yours. Try again!");
            }

            try {
                $nextChrono = (
                    date("Y") .
                    strtoupper(substr($invoice->getCustomer()->getLastName(), 0, 4)) .
                    str_pad(($this->invoiceRepo->findLastChrono($user) + 1), 5, 0, STR_PAD_LEFT)
            );
                $invoice->setChrono($nextChrono);
            } catch (Exception $e) {
                $nextChrono = 1;
                $invoice->setChrono($nextChrono);

                //TODO : A déplacer dans une class plus tard
                if (empty($invoice->getSentAT())){
                    $invoice->setSentAT(new \DateTime());
                }
            }
        }
    }
}