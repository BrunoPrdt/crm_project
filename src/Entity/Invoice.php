<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\InvoiceRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=InvoiceRepository::class)
 * @ApiResource(
 *     collectionOperations={"get", "post"},
 *     itemOperations={"get", "delete", "PUT", "patch"},
 *     subresourceOperations={
            "api_customers_invoices_get_subresource"={
 *          "normalization_context"={"groups"={"invoices_subresource"}}
 *      }
 *     },
 *     attributes={
     *     "pagination_enabled"=false,
     *     "pagination_items_per_page"=20,
     *     "order": {"sentAT":"desc"}
 *      },
 *     normalizationContext={"groups"={"invoices_read"}},
 *     denormalizationContext={"disable_type_enforcement"=true}
*     )
 * @ApiFilter(OrderFilter::class, properties={"amount", "sentAT"})
 */
class Invoice
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     */
    private $id;

    /**
     * @ORM\Column(type="float")
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     * @Assert\NotBlank(message="Le montant de la facture est obligatoire")
     * @Assert\Type(type="numeric", message="Le montant de la facture doit être un numérique")
     */
    private $amount;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     * Assert\DateTime(message="La date doit être au format YYYY-MM-DD")     *
     * @Assert\Type("\DateTime", message="La date doit être au format YYYY-MM-DD")
     * @var string A "Y-m-d" formatted value
     * @Assert\NotBlank(message="La date doit être renseignée")
     */
    private $sentAT;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     * @Assert\NotBlank(message="Le status de la facture est obligatoire")
     * @Assert\Choice(choices={"SENT", "PAID", "CANCELLED"}, message="Le status doit être renseigné (SENT, PAID ou CANCELLED)")
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity=Customer::class, inversedBy="invoices")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"invoices_read"})
     *
     * @Assert\NotBlank(message="Le client de la facture doit être renseigné")
     */
    private $customer;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})     *
     * @Assert\NotBlank(message="Il faut absoluement un chrono pour la facture")
     */
    private $chrono;

    /**
     * @return User
     * @Groups({"invoices_read", "invoices_subresource"})
     */
    public function getUser(): User
    {
        return $this->customer->getUser();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount($amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getSentAT(): ?\DateTimeInterface
    {
        return $this->sentAT;
    }

    public function setSentAT($sentAT): self
    {
        $this->sentAT = $sentAT;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getChrono(): ?string
    {
        return $this->chrono;
    }

    public function setChrono($chrono): self
    {
        $this->chrono = $chrono;

        return $this;
    }
}
